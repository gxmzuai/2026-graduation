import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface Roommate {
  id: string
  name: string
  qq: string
  gender: string
}

interface RoommateListProps {
  roommates: Roommate[]
}

export function RoommateList({ roommates }: RoommateListProps) {
  const getQQAvatarUrl = (qq: string) => {
    return `https://q.qlogo.cn/g?b=qq&nk=${qq}&s=100`
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {roommates.map((member) => (
          <Card key={member.id}>
            <CardContent className="pt-4">
              <div className="flex flex-col items-center space-y-2">
                <Avatar className="h-20 w-20">
                  <AvatarImage 
                    src={getQQAvatarUrl(member.qq)} 
                    alt={member.name} 
                  />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {member.id}
                    <span className={`ml-2 ${member.gender === '男' ? 'text-blue-500' : 'text-pink-500'}`}>
                      {member.gender === '男' ? '♂️' : '♀️'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
