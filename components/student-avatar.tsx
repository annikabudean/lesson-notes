import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function StudentAvatar({ name }: { name: string }) {
  const nameParts = name.trim().split(/\s+/)
  const initials = nameParts.length > 1
    ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
    : nameParts[0][0]

  return (
    <Avatar size="lg">
      <AvatarFallback className="bg-forest text-[#FAF7F2]">{initials}</AvatarFallback>
    </Avatar>
  )
}
