import axios from "axios";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Milestone {
  id?: string;
  title?: string;
  description?: string;
  status?: "planned" | "completed" | "in-progress";
  amount?: number;
  progress?: number;
  deadlineAt?: string;
  completedAt?: string;
  plannedAt?: string;
  raised_amount?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initial: string;
  email?: string;
  university?: string;
  department?: string;
  skills?: string;
  bio?: string;
  profileImage?: string;
}

export interface Update {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface ProjectMember {
  id: number;
  projectId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    university_email: string;
    profile_picture: string | null;
    university: string;
    department: string;
  };
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  category?: string;
  budget?: number;
  raised_amount?: number;
  status: "active" | "draft";
  createdAt?: string;
  milestones?: Milestone[] | string[];
  cover_image?: File | string;
  documents?: any[];
  documentsToDelete?: string; // Add this new property
  location?: string | null;
  pitch_video?: string;
  profile_picture?: File | string;
  start_date?: string | null;
  tags?: string | null;
  updatedAt?: string;
  userId?: number;
  projectMembers?: ProjectMember[];
}

export interface FormState {
  title: string;
  description: string;
  category: string;
  budget: number;
  tags: string;
  university: string;
  department: string;
  teamSize: string;
  raised_amount?: number;
}

export interface MediaFormState {
  coverImage: File | string;
  logoImage: File | string;
  pitch_video: string;
}

export interface ProjectStore {
  projects: Project[];
  teamMembers: TeamMember[];
  milestones: Milestone[];
  updates: Update[];
  formState: FormState;
  mediaFormState: MediaFormState;
  mediaChanged: boolean;
  currentProjectId: string | null;
  isLoading: boolean;
  formErrors: Record<string, string>;
  fetchProjects: () => Promise<void>;
  updateState: <T extends keyof ProjectStore>(
    key: T,
    value: ProjectStore[T] | ((prev: ProjectStore[T]) => ProjectStore[T])
  ) => void;

  saveProject: (id: string, data: Partial<Project>) => Promise<void>;

  formatProjectData: (project: Project) => void;

  handlePublishProject: (projectId: string) => Promise<void>;

  addItem: (type: "milestone" | "teamMember" | "update") => void;
  updateItem: (
    type: "milestone" | "teamMember" | "update",
    id: string,
    field: string,
    value: any
  ) => void;
  deleteItem: (type: "milestone" | "teamMember" | "update", id: string) => void;

  setFormState: (updates: Partial<FormState>) => void;
  setMediaFormState: (updates: Partial<MediaFormState>) => void;
  setMediaChanged: (changed: boolean) => void;
  setFormErrors: (errors: Record<string, string>) => void;
  setIsLoading: (loading: boolean) => void;
  setCurrentProjectId: (id: string | null) => void;
  resetFormState: () => void;
  initializeFormState: (project: Project) => void;
  setRaisedAmount: () => void;
}

export const useProjectStore = create<ProjectStore>()(
  devtools(
    persist(
      (set, get) => ({
        projects: [],
        teamMembers: [],
        milestones: [],
        updates: [],
        formState: {
          title: "",
          description: "",
          category: "",
          budget: 0,
          tags: "",
          university: "",
          department: "",
          raised_amount: 0,
          teamSize: "1",
        },
        mediaFormState: {
          coverImage: "",
          logoImage: "",
          pitch_video: "",
        },
        mediaChanged: false,
        currentProjectId: null,
        isLoading: false,
        formErrors: {},
        
        updateState: <T extends keyof ProjectStore>(
          key: T,
          value: ProjectStore[T] | ((prev: ProjectStore[T]) => ProjectStore[T])
        ) => {
          set((state) => ({
            [key]:
              typeof value === "function"
                ? (value as (prev: ProjectStore[T]) => ProjectStore[T])(
                    state[key]
                  )
                : value,
          }));
        },

        saveProject: async (id, updatedData) => {
          try {
            console.log("Saving project:", id, updatedData);

            const formData = new FormData();
            formData.append("projectId", id);
            Object.keys(updatedData).forEach((key) => {
              if (key === "documents") {
                updatedData.documents?.forEach((file) => {
                  if (file instanceof File) {
                    formData.append("documents", file);
                  }
                });
              } else if (key === "documentsToDelete") {
                formData.append(
                  "documentsToDelete",
                  updatedData.documentsToDelete as string
                );
              } else if (key === "cover_image" || key === "profile_picture") {
                if (updatedData[key]) {
                  formData.append(key, updatedData[key]);
                }
              } else if (key === "milestones") {
                if (
                  updatedData.milestones &&
                  updatedData.milestones.length > 0
                ) {
                  formData.append(
                    "milestones",
                    JSON.stringify(updatedData.milestones)
                  );
                } else {
                  formData.append("milestones", JSON.stringify([]));
                }
              } else {
                formData.append(
                  key,
                  updatedData[key as keyof typeof updatedData]?.toString() || ""
                );
              }
            });

            await axios.put("/api/user/project", formData, {
              params: { id },
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            console.log("Would save to backend:", id, ...formData.entries());
          } catch (error) {
            console.error("Error updating project:", error);
            throw error;
          }
        },

        fetchProjects: async () => {
          try {
            const response = await axios.get("/api/user/project");
            console.log("Fetched projects:", response.data);
            set({ projects: response.data });
          } catch (error) {
            console.error("Error fetching projects:", error);
          }
        },

        handlePublishProject: async (projectId: string) => {
          try {
            const response = await axios.put("/api/user/project/publish", {
              projectId,
            });
            set((state) => ({
              projects: state.projects.map((project) =>
                project.id === projectId
                  ? { ...project, status: "active" }
                  : project
              ),
            }));
            return response.data;
          } catch (error) {
            console.error("Error publishing project:", error);
            throw error;
          }
        },

        addItem: (type) => {
          const state = get();

          if (type === "milestone") {
            const newMilestone = {
              id: `m${state.milestones.length + 1}`,
              title: "New Milestone",
              description: "Describe what you will achieve in this milestone",
              amount: 0,
              status: "planned" as const,
              plannedAt: new Date().toLocaleDateString(),
            };
            set({ milestones: [...state.milestones, newMilestone] });
          } else if (type === "teamMember") {
            const newMember = {
              id: `t${state.teamMembers.length + 1}`,
              name: "New Team Member",
              role: "Member",
              initial: "N",
              email: "",
              university: "",
              department: "",
              skills: "",
              bio: "",
            };
            set({ teamMembers: [...state.teamMembers, newMember] });
          } else if (type === "update") {
            const newUpdate = {
              id: `u${state.updates.length + 1}`,
              title: "New Update",
              content:
                "Share your progress or announcements with your audience",
              date: new Date().toLocaleDateString(),
            };
            set({ updates: [...state.updates, newUpdate] });
          }
        },

        updateItem: (type, id, field, value) => {
          const state = get();

          if (type === "milestone") {
            const index = state.milestones.findIndex((m) => m.id === id);
            if (index !== -1) {
              const updatedMilestones = [...state.milestones];
              updatedMilestones[index] = {
                ...updatedMilestones[index],
                [field]: value,
              };
              console.log("Updated milestone:", updatedMilestones[index]);

              set({ milestones: updatedMilestones });
            }
          } else if (type === "teamMember") {
            set({
              teamMembers: state.teamMembers.map((member) =>
                member.id === id
                  ? {
                      ...member,
                      [field]: value,
                      ...(field === "name" ? { initial: value.charAt(0) } : {}),
                    }
                  : member
              ),
            });
          } else if (type === "update") {
            set({
              updates: state.updates.map((update) =>
                update.id === id ? { ...update, [field]: value } : update
              ),
            });
          }
        },

        deleteItem: (type, id) => {
          const state = get();

          if (type === "milestone") {
            set({ milestones: state.milestones.filter((m) => m.id !== id) });
          } else if (type === "teamMember") {
            set({ teamMembers: state.teamMembers.filter((m) => m.id !== id) });
          } else if (type === "update") {
            set({ updates: state.updates.filter((u) => u.id !== id) });
          }
        },

        formatProjectData: (project) => {
          if (project.projectMembers && Array.isArray(project.projectMembers)) {
            const formattedTeamMembers = project.projectMembers.map(
              (member, index) => ({
                id: `t${index}`,
                name: member.user?.name || "Team Member",
                role: "Member",
                initial: (member.user?.name || "T")[0],
                email: member.user?.university_email || "",
                university: member.user?.university || "",
                department: member.user?.department || "",
                skills: "",
                bio: "",
              })
            );
            set({ teamMembers: formattedTeamMembers });
          } else {
            set({ teamMembers: [] });
          }
          if (project.milestones && Array.isArray(project.milestones)) {
            console.log("Project milestones:", project.milestones);
            const formattedMilestones = project.milestones.map(
              (milestone: Milestone, index) => {
                return {
                  id: milestone.id || `m${index}`,
                  title: milestone.title || "",
                  description: milestone.description || "",
                  amount: milestone.amount || 0,
                  status: milestone.status || "planned",
                  progress: milestone.progress || 0,
                  deadlineAt: milestone.deadlineAt || "",
                  completedAt: milestone.completedAt || "",
                  plannedAt: milestone.plannedAt || "",
                  raised_amount: milestone.raised_amount || 0,
                };
              }
            );
            set({ milestones: formattedMilestones });
          } else {
            set({ milestones: [] });
          }

          set({ updates: [] });
        },

        setFormState: (updates) => {
          set((state) => ({
            formState: { ...state.formState, ...updates },
          }));
        },
        setRaisedAmount: () => {
          const state = get();
          const totalRaised = state.milestones.reduce(
            (acc, milestone) => acc + (Number(milestone.raised_amount) || 0),
            0
          );
          if (state.currentProjectId) {
            set((state) => ({
              formState: { ...state.formState, raised_amount: totalRaised },
            }));
          } else {
            set({
              formState: { ...state.formState, raised_amount: totalRaised },
            });
          }
        },
        setMediaFormState: (updates) => {
          set((state) => ({
            mediaFormState: { ...state.mediaFormState, ...updates },
            mediaChanged: true,
          }));
        },

        setMediaChanged: (changed) => {
          set({ mediaChanged: changed });
        },

        setFormErrors: (errors) => {
          set({ formErrors: errors });
        },

        setIsLoading: (loading) => {
          set({ isLoading: loading });
        },

        setCurrentProjectId: (id) => {
          set({ currentProjectId: id });
        },

        resetFormState: () => {
          set({
            formState: {
              title: "",
              description: "",
              category: "",
              budget: 0,
              tags: "",
              university: "",
              department: "",
              teamSize: "1",
            },
            mediaFormState: {
              coverImage: "",
              logoImage: "",
              pitch_video: "",
            },
            mediaChanged: false,
            formErrors: {},
          });
        },

        initializeFormState: (project) => {
          console.log("Initializing form state with project:", project);

          set({
            formState: {
              title: project.title || "",
              description: project.description || "",
              category: project.category || "",
              budget: project.budget || 0,
              tags: project.tags || "",
              university: project.projectMembers?.[0]?.user?.university || "",
              department: project.projectMembers?.[0]?.user?.department || "",
              teamSize: project.projectMembers?.length?.toString() || "1",
              raised_amount: project.raised_amount || 0,
            },
            mediaFormState: {
              coverImage: project.cover_image || "",
              logoImage: project.profile_picture || "",
              pitch_video: project.pitch_video || "",
            },
            mediaChanged: false,
          });
        },
      }),
      {
        name: "project-storage",
        partialize: (state) => ({
          projects: state.projects,
          formState: state.formState,
          mediaFormState: state.mediaFormState,
          currentProjectId: state.currentProjectId,
        }),
      }
    ),
    { name: "project-store" }
  )
);
