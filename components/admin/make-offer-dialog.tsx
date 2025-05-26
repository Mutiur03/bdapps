"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowRight,
  DollarSign,
  CalendarClock,
  FileText,
  Gift,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MakeOfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startup: any;
}

export function MakeOfferDialog({
  open,
  onOpenChange,
  startup,
}: MakeOfferDialogProps) {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [milestone, setMilestone] = useState("");
  const [investmentType, setInvestmentType] = useState("donation");
  const [timeline, setTimeline] = useState("15");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);

      toast({
        title: "Offer Submitted",
        description: `Your offer of ${amount} ৳ has been sent to ${startup.founder}.`,
      });

      // Reset form
      setAmount("");
      setMilestone("");
      setInvestmentType("donation");
      setTimeline("15");
      setNotes("");
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-border shadow-lg">
        <DialogHeader className="pb-2 border-b border-border">
          <DialogTitle className="text-foreground text-xl flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
            Make an Investment Offer
          </DialogTitle>
          <DialogDescription>
            {console.log(startup)};

            Send an investment offer to {startup?.user.name} for {startup?.title}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-foreground">
                Investment Amount (৳)
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount in BDT"
                  value={startup?.amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                The minimum investment amount is ৳1,000
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="milestone" className="text-foreground">
                Select Milestone
              </Label>
              <Select value={milestone} onValueChange={setMilestone} required>
                <SelectTrigger id="milestone" className="border-input">
                  <SelectValue placeholder="Select a milestone" />
                </SelectTrigger>
                <SelectContent>
                  {startup?.milestones
                    .filter((m: any) => m.status !== "completed")
                    .map((m: any) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.title} ({m.amount})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Investment Type</Label>
              <RadioGroup
                value={investmentType}
                onValueChange={setInvestmentType}
                className="grid grid-cols-1 gap-2 pt-1"
              >
                <InvestmentTypeOption
                  value="donation"
                  label="Donation"
                  description="No return expected"
                  icon={<Gift className="h-4 w-4" />}
                  selectedValue={investmentType}
                />
                <InvestmentTypeOption
                  value="roi"
                  label="Return on Investment"
                  description="Receive returns based on success"
                  icon={<TrendingUp className="h-4 w-4" />}
                  selectedValue={investmentType}
                />
                <InvestmentTypeOption
                  value="repayment"
                  label="Repayment"
                  description="Get your money back"
                  icon={<Wallet className="h-4 w-4" />}
                  selectedValue={investmentType}
                />
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline" className="text-foreground">
                Timeline (Days)
              </Label>
              <div className="relative">
                <CalendarClock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Select value={timeline} onValueChange={setTimeline}>
                  <SelectTrigger id="timeline" className="pl-10 border-input">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="15">15 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="45">45 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-foreground">
                Additional Notes
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="notes"
                  placeholder="Any specific requirements or expectations..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="pl-10 resize-none"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="border-t border-border pt-4 mt-4 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="border-input"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Send Offer"}
              {!isSubmitting && <ArrowRight className="h-4 w-4" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Helper component for investment type options
function InvestmentTypeOption({
  value,
  label,
  description,
  icon,
  selectedValue,
}: {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  selectedValue: string;
}) {
  const isSelected = selectedValue === value;

  return (
    <div
      className={cn(
        "flex items-center space-x-2 rounded-md border border-input p-3 transition-colors",
        isSelected && "border-primary bg-primary/5"
      )}
    >
      <RadioGroupItem
        value={value}
        id={value}
        className="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
      />
      <div className="flex flex-1 items-center justify-between">
        <Label htmlFor={value} className="flex-1 cursor-pointer">
          <div className="font-medium">{label}</div>
          <div className="text-xs text-muted-foreground">{description}</div>
        </Label>
        <div
          className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center",
            isSelected
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground"
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
