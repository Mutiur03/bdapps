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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface UdayeeMakeOfferDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  startup: any
}

export function UdayeeMakeOfferDialog({ open, onOpenChange, startup }: UdayeeMakeOfferDialogProps) {
  const { toast } = useToast()
  const [amount, setAmount] = useState("")
  const [milestone, setMilestone] = useState("")
  const [investmentType, setInvestmentType] = useState("donation")
  const [timeline, setTimeline] = useState("15")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onOpenChange(false)

      toast({
        title: "Offer Submitted",
        description: `Your offer of ${amount} ৳ has been sent to ${startup.founder}.`,
      })

      // Reset form
      setAmount("")
      setMilestone("")
      setInvestmentType("donation")
      setTimeline("15")
      setNotes("")
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-[#005247]">Make an Investment Offer</DialogTitle>
          <DialogDescription>
            Send an investment offer to {startup.founder} for {startup.name}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Investment Amount (৳)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount in BDT"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="milestone">Select Milestone</Label>
              <Select value={milestone} onValueChange={setMilestone} required>
                <SelectTrigger id="milestone">
                  <SelectValue placeholder="Select a milestone" />
                </SelectTrigger>
                <SelectContent>
                  {startup.milestones
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
              <Label>Investment Type</Label>
              <RadioGroup value={investmentType} onValueChange={setInvestmentType} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="donation" id="donation" />
                  <Label htmlFor="donation" className="font-normal">
                    Donation (No return expected)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="roi" id="roi" />
                  <Label htmlFor="roi" className="font-normal">
                    Return on Investment (ROI)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="repayment" id="repayment" />
                  <Label htmlFor="repayment" className="font-normal">
                    Repayment (Get your money back)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline (Days)</Label>
              <Select value={timeline} onValueChange={setTimeline}>
                <SelectTrigger id="timeline">
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

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any specific requirements or expectations..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#FF7F00] hover:bg-[#e67300] text-white" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Send Offer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
