export async function GET() {
  console.log("✅ Test API was called!");
  return Response.json({
    message: "Your API is working!",
    time: new Date().toISOString(),
  });
}
