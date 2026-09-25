import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  return (
    <Field orientation="horizontal">
      <Input 
        className="bg-cream border border-taupe text-charcoal placeholder:text-warm-gray focus:border-forest focus:bg-ivory focus:outline-none h-10 w-full" 
        type="search" 
        placeholder="Search for a student..." 
      />
      <Button variant="outline" className="text-black h-10"> Search </Button>
    </Field> 
  )
}
