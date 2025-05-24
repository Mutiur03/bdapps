"use client"
import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"
import { useProjectStore } from "@/store/useProjectStore"
interface UdayeeCreateProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}
export function UdayeeCreateProjectDialog({ open, onOpenChange }: UdayeeCreateProjectDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formRef, setFormRef] = useState<HTMLFormElement | null>(null)
  const { fetchProjects } = useProjectStore()
  const handleSubmit = async (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const form = e.currentTarget instanceof HTMLFormElement
        ? e.currentTarget
        : formRef;

      if (!form) {
        console.error("Form reference not found");
        return;
      }

      const formDataToSubmit = new FormData(form);
      formDataToSubmit.append("status", isDraft ? "draft" : "pending");

      console.log(...formDataToSubmit.entries());
      const res = await axios.post("/api/user/project", formDataToSubmit);
      console.log("Project created:", res.data);

      await fetchProjects();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-[#005247]">Create New Project</DialogTitle>
          <DialogDescription>
            Add a new startup project to your profile. You can save it as a draft or publish it right away.
          </DialogDescription>
        </DialogHeader>
        <form ref={setFormRef} onSubmit={(e) => handleSubmit(e, false)} className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter your project name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Briefly describe your startup project"
                rows={3}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                name="category"
                required
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="Environment">Environment</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Agriculture">Agriculture</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Funding Goal (৳)</Label>
              <Input
                id="budget"
                name="budget"
                type="number"
                placeholder="Enter amount in BDT"
                required
              />
              <p className="text-xs text-muted-foreground">
                You can break down this goal into milestones after creating the project
              </p>
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button type="button" variant="outline" onClick={(e) => handleSubmit(e, true)} disabled={isSubmitting}>
              Save as Draft
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#FF7F00] hover:bg-[#e67300] text-white" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create & Publish"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
