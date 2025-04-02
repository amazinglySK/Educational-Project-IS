import { getPDFContent } from "@/lib/ocrHelper";

export async function POST(req: NextRequest) {
  try {
    const formData: FormData = await req.formData();
    const file: File = formData.get('pdf');
    const response = await getPDFContent(file.name, file);
    console.log(response);
    const markdown_value = response.pages.reduce((acc, curr) => acc + '\n' + curr.markdown, "");
    console.log(markdown_value);
    return Response.json({content: markdown_value}, {status: 200});
  } catch (error) {
    console.error("Error processing the data:", error)
    return Response.json({error: "Failed to process the data"}, {status: 400});
  }
}