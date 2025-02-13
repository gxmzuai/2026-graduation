import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface Member {
  id: string
  name: string
  qq: string
  gender: string
}

interface MemberListProps {
  classMembers: Member[]
  dormMembers: Member[]
}

export function MemberList({ classMembers, dormMembers }: MemberListProps) {
  const getQQAvatarUrl = (qq: string) => {
    return `https://q.qlogo.cn/g?b=qq&nk=${qq}&s=100`
  }

  const renderMemberGrid = (members: Member[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {members.map((member) => (
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
                  <span className="ml-2">
                    {member.gender === '男' ? '♂️' : '♀️'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <Tabs defaultValue="class" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="class">班级成员</TabsTrigger>
        <TabsTrigger value="dorm">宿舍成员</TabsTrigger>
      </TabsList>

      <TabsContent value="class" className="space-y-4">
        <h2 className="text-2xl font-bold text-center mb-6">班级成员</h2>
        {renderMemberGrid(classMembers)}
      </TabsContent>

      <TabsContent value="dorm" className="space-y-4">
        <h2 className="text-2xl font-bold text-center mb-6">宿舍成员</h2>
        {renderMemberGrid(dormMembers)}
      </TabsContent>
    </Tabs>
  )
}
