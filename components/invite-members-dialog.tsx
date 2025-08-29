"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { UserPlus, X, Mail, Link, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface InviteMembersDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  groupName: string
  groupId: string
}

export function InviteMembersDialog({ open, onOpenChange, groupName, groupId }: InviteMembersDialogProps) {
  const [emails, setEmails] = useState<string[]>([])
  const [currentEmail, setCurrentEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const addEmail = () => {
    const email = currentEmail.trim()
    if (email && email.includes("@") && !emails.includes(email)) {
      setEmails([...emails, email])
      setCurrentEmail("")
    }
  }

  const removeEmail = (emailToRemove: string) => {
    setEmails(emails.filter((email) => email !== emailToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (emails.length === 0) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Invitations sent!",
        description: `${emails.length} invitation(s) sent successfully.`,
      })
      onOpenChange(false)
      // Reset form
      setEmails([])
      setMessage("")
    }, 1000)
  }

  const copyInviteLink = () => {
    const inviteLink = `${window.location.origin}/groups/${groupId}/join?invite=abc123`
    navigator.clipboard.writeText(inviteLink)
    toast({
      title: "Link copied!",
      description: "Invite link copied to clipboard.",
    })
  }

  const generateInviteLink = () => {
    return `${window.location.origin}/groups/${groupId}/join?invite=abc123`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-popover border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-popover-foreground flex items-center">
            <UserPlus className="mr-2 h-5 w-5" />
            Invite Members to {groupName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Email Invitations */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold">Send Email Invitations</Label>
              <p className="text-sm text-muted-foreground">Invite students by their email addresses</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Addresses</Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    placeholder="student@university.edu"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addEmail())}
                    className="bg-input border-border"
                  />
                  <Button type="button" onClick={addEmail} variant="outline" className="border-border bg-transparent">
                    Add
                  </Button>
                </div>
                {emails.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {emails.map((email) => (
                      <Badge key={email} variant="secondary" className="text-xs">
                        {email}
                        <button
                          type="button"
                          onClick={() => removeEmail(email)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Personal Message (Optional)</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add a personal message to your invitation..."
                  className="bg-input border-border"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading || emails.length === 0}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Mail className="mr-2 h-4 w-4" />
                {isLoading ? "Sending..." : `Send ${emails.length} Invitation${emails.length !== 1 ? "s" : ""}`}
              </Button>
            </form>
          </div>

          <Separator />

          {/* Shareable Link */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold">Share Invite Link</Label>
              <p className="text-sm text-muted-foreground">Generate a link that anyone can use to join the group</p>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Input value={generateInviteLink()} readOnly className="bg-muted border-border text-sm" />
                <Button onClick={copyInviteLink} variant="outline" className="border-border bg-transparent">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <Button onClick={copyInviteLink} variant="outline" className="flex-1 border-border bg-transparent">
                  <Link className="mr-2 h-4 w-4" />
                  Copy Link
                </Button>
                <Button
                  onClick={() => {
                    const subject = `Join ${groupName} Study Group`
                    const body = `You're invited to join the ${groupName} study group!\n\nClick here to join: ${generateInviteLink()}`
                    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
                  }}
                  variant="outline"
                  className="flex-1 border-border bg-transparent"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Share via Email
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="border-border">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
