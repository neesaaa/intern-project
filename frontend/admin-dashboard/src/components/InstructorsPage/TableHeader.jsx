export default function TableHeader() {
  return (
    <thead className="bg-[#F1F5FF] rounded-t-xl">
      <tr >
        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Name</th>
        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Job Title</th>
        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Rate</th>
        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Action</th>
      </tr>
    </thead>
  )
}
