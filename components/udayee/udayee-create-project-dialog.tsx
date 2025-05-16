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
import { useToast } from "@/hooks/use-toast"

interface UdayeeCreateProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UdayeeCreateProjectDialog({ open, onOpenChange }: UdayeeCreateProjectDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    fundingGoal: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent, saveAsDraft = false) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onOpenChange(false)

      toast({
        title: saveAsDraft ? "Draft Saved" : "Project Created",
        description: saveAsDraft
          ? "Your project has been saved as a draft."
          : "Your project has been created successfully.",
      })

      // Reset form
      setFormData({
        name: "",
        description: "",
        category: "",
        fundingGoal: "",
      })
    }, 1500)
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

        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your project name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Briefly describe your startup project"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
                required
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
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
              <Label htmlFor="fundingGoal">Funding Goal (৳)</Label>
              <Input
                id="fundingGoal"
                name="fundingGoal"
                type="number"
                placeholder="Enter amount in BDT"
                value={formData.fundingGoal}
                onChange={handleChange}
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
