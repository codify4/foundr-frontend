import { Label } from "@radix-ui/react-label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import PageInfo from "./page-info"
import { Textarea } from "@/components/ui/textarea"
import { auth } from "@/auth"

interface Project {
    name: string;
    link: string;
    description: string;
    revenue: number;
}
  
interface Social {
    platform: string;
    url: string;
}

type DesignFormProps = {
  projects: Project[];
  socials: Social[];
  newProject: Project;
  newSocial: Social;
  isProjectDialogOpen: boolean;
  isSocialDialogOpen: boolean;
  setIsProjectDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSocialDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNewProject: React.Dispatch<React.SetStateAction<Project>>;
  setNewSocial: React.Dispatch<React.SetStateAction<Social>>;
  addProject: () => void;
  removeProject: (index: number) => void;
  addSocial: () => void;
  removeSocial: (index: number) => void;
}

const DesignForm = ({ 
  projects, 
  socials, 
  newProject, 
  newSocial, 
  isProjectDialogOpen, 
  isSocialDialogOpen, 
  setIsProjectDialogOpen, 
  setIsSocialDialogOpen,
  setNewProject, 
  setNewSocial, 
  addProject, 
  removeProject, 
  addSocial, 
  removeSocial,
}: DesignFormProps) => {


  return (
      <div className="w-full lg:w-2/5 p-4 md:p-8 overflow-auto">
        <h1 className="text-xl lg:text-2xl font-bold mb-6">Create Your Single Page Website</h1>
        <div className="space-y-4">
          <PageInfo />
          <div>
            <Label htmlFor="socials" className="text-sm font-medium mr-5">Social Media</Label>
            <Dialog open={isSocialDialogOpen} onOpenChange={setIsSocialDialogOpen}>
              <DialogTrigger asChild>
                <Button className="mt-1 bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-white">Add Social Media</Button>
              </DialogTrigger>
              <DialogContent className='w-11/12 rounded-lg bg-white dark:bg-neutral-900 text-black dark:text-white'>
                <DialogHeader>
                  <DialogTitle>Add Social Media Link</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="socialPlatform" className="text-sm font-medium">Platform</Label>
                    <Select
                      onValueChange={(value) => setNewSocial({...newSocial, platform: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-neutral-900 text-black dark:text-white">
                        <SelectItem value="github">GitHub</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="socialUrl" className="text-sm font-medium">URL</Label>
                    <Input
                      autoComplete="off"
                      id="socialUrl"
                      value={newSocial.url}
                      onChange={(e) => setNewSocial({...newSocial, url: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <Button onClick={addSocial} className="bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-white">Add Social Media</Button>
                </div>
              </DialogContent>
            </Dialog>
            <ul className="mt-2 space-y-2">
              {socials.map((social, index) => (
                <li key={index} className="flex items-center justify-between bg-white dark:bg-neutral-800 text-black dark:text-white p-2 rounded">
                  <span>{social.platform}</span>
                  <Button onClick={() => removeSocial(index)} variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Label htmlFor="projects" className="text-sm font-medium mr-5">Projects</Label>
            <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
              <DialogTrigger asChild>
                <Button className="mt-1 bg-primary hover:bg-secondary dark:bg-secondary dark:hover:bg-primary text-white">Add Project</Button>
              </DialogTrigger>
              <DialogContent className='w-11/12 rounded-lg bg-white dark:bg-neutral-900 text-black dark:text-white'>
                <DialogHeader>
                  <DialogTitle>Add New Project</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="projectName" className="text-sm font-medium">Project Name</Label>
                    <Input
                      autoComplete="off"
                      id="projectName"
                      value={newProject.name}
                      onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectLink" className="text-sm font-medium">Project Link</Label>
                    <Input
                      autoComplete="off"
                      id="projectLink"
                      value={newProject.link}
                      onChange={(e) => setNewProject({...newProject, link: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectDescription" className="text-sm font-medium">Project Description</Label>
                    <Textarea
                      autoComplete="off"
                      id="projectDescription"
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectRevenue" className="text-sm font-medium">Total Revenue</Label>
                    <Input
                      autoComplete="off"
                      id="projectRevenue"
                      type="number"
                      value={newProject.revenue}
                      onChange={(e) => setNewProject({...newProject, revenue: parseFloat(e.target.value)})}
                      className="mt-1"
                    />
                  </div>
                  <Button onClick={addProject} className="bg-primary hover:bg-secondary text-white">Add Project</Button>
                </div>
              </DialogContent>
            </Dialog>
            <ul className="mt-2 space-y-2">
              {projects.map((project, index) => (
                <li key={index} className="flex items-center justify-between bg-white dark:bg-neutral-800 text-black dark:text-white p-2 rounded">
                  <span>{project.name}</span>
                  <Button onClick={() => removeProject(index)} variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
    </div>
  )
}
export default DesignForm