import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import path from "path";
import fs from "fs";
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const investor = await prisma.investor.findUnique({
      where: { email: session.user.email },
    });

    if (!investor) {
      return NextResponse.json(
        { error: "Investor not found" },
        { status: 404 }
      );
    }

    // Format customSocials if it exists
    let formattedSocials = [];
    if (investor.customSocials) {
      try {
        const socialData =
          typeof investor.customSocials === "object"
            ? investor.customSocials
            : JSON.parse(String(investor.customSocials));

        formattedSocials = socialData.links || [];
      } catch (e) {
        console.error("Error parsing customSocials:", e);
      }
    }

    return NextResponse.json({
      name: investor.name || "",
      email: investor.email || "",
      phone: investor.phone || "",
      location: investor.location || "",
      profile_picture: investor.profile_picture || "",
      bio: investor.bio || "",
      company: investor.company_name || "",
      role: investor.company_role || "",
      experienceYears: investor.experienceYears || "",
      investmentFocus: investor.investmentFocus || [],
      minInvestment: investor.minInvestment || "",
      maxInvestment: investor.maxInvestment || "",
      preferredStages: investor.preferredStages || [],
      customSocials: formattedSocials,
    });
  } catch (error) {
    console.error("Error retrieving investor profile:", error);
    return NextResponse.json(
      { error: "Failed to retrieve investor profile" },
      { status: 500 }
    );
  }
}
interface Social {
  id: string;
  title: string;
  url: string;
}
export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await req.formData();

    // Find the investor
    const investor = await prisma.investor.findUnique({
      where: { email: session.user.email },
    });

    if (!investor) {
      return NextResponse.json(
        { error: "Investor not found" },
        { status: 404 }
      );
    }
    const {
      name,
      phone,
      location,
      bio,
      company,
      website,
      role,
      experienceYears,
      investmentFocus,
      minInvestment,
      maxInvestment,
      preferredStages,
      customSocials,
      profile_picture,
    } = Object.fromEntries(data.entries());
    // Format social links for storage
    const focus = JSON.parse(investmentFocus.toString());
    console.log(focus);
    const stage = JSON.parse(preferredStages.toString());
    const customSocialsJson = { links: [] as Social[] };
    if (customSocials) {
      try {
        const parsedSocials =
          typeof customSocials === "string"
            ? JSON.parse(customSocials)
            : customSocials;

        if (Array.isArray(parsedSocials)) {
          customSocialsJson.links = parsedSocials;
        }
      } catch (e) {
        console.error("Error parsing customSocials:", e);
      }
    }
    let avatar = "";
    if (profile_picture instanceof File) {
      const uploadDir = path.join(
        process.cwd(),
        "public/uploads/profile_pictures"
      );
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const profile_picture_name = `${Date.now()}-${profile_picture.name}`;
      const profile_picture_path = `public/uploads/profile_pictures/${profile_picture_name}`;
      const fileBuffer = Buffer.from(await profile_picture.arrayBuffer());
      fs.writeFileSync(profile_picture_path, fileBuffer);
      avatar = `/uploads/profile_pictures/${profile_picture_name}`;
    }
    console.log(investmentFocus);

    // Prepare update data
    const updateData: any = {
      name: name.toString(),
      phone: phone.toString(),
      company_name: company ? company.toString() : null,
      company_website: website ? website.toString() : null,
      location: location ? location.toString() : null,
      bio: bio ? bio.toString() : null,
      company_role: role.toString(),
      experienceYears: experienceYears ? experienceYears.toString() : null,
      investmentFocus: investmentFocus ? focus : [],
      minInvestment: Number(minInvestment),
      maxInvestment: Number(maxInvestment),
      preferredStages: preferredStages ? stage : [],
      customSocials: JSON.stringify(customSocialsJson),
      updatedAt: new Date(),
    };

    // Only update profile_picture if a new file was uploaded
    if (profile_picture instanceof File) {
      updateData.profile_picture = avatar;
    }

    // Update investor profile
    const updatedInvestor = await prisma.investor.update({
      where: { id: investor.id },
      data: updateData,
    });

    return NextResponse.json({
      name: updatedInvestor.name || "",
      email: updatedInvestor.email || "",
      phone: updatedInvestor.phone || "",
      location: updatedInvestor.location || "",
      profile_picture: updatedInvestor.profile_picture || "",
      bio: updatedInvestor.bio || "",
      company: updatedInvestor.company_name || "",
      role: updatedInvestor.role || "investor",
      experienceYears: updatedInvestor.experienceYears || "",
      investmentFocus: updatedInvestor.investmentFocus || [],
      minInvestment: updatedInvestor.minInvestment || "",
      maxInvestment: updatedInvestor.maxInvestment || "",
      preferredStages: updatedInvestor.preferredStages || [],
      customSocials: customSocialsJson.links,
    });
  } catch (error) {
    console.error("Error updating investor profile:", error);
    return NextResponse.json(
      { error: "Failed to update investor profile" },
      { status: 500 }
    );
  }
}
