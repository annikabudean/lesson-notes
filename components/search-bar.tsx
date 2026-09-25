import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  return (
    <Field orientation="horizontal">
      <Input 
        className="bg-white text-black h-15 w-full" 
        type="search" 
        placeholder="Search for a student..." 
      />
      <Button variant="outline" className="text-black h-15"> Search </Button>
    </Field> 
  )
}
