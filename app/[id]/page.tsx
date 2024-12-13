import connectDB from "@/config/database";
import Machine from "@/models/equipment";
import { notFound } from "next/navigation";

export default async function MachinePage({
  params,
}: {
  params: { id: string };
}) {
  try {
    await connectDB();
    const data = await Machine.findById(params.id);

    if (!data) {
      notFound();
    }

    return (
      <div>
        <h1>{data.name}</h1>
        {/* Add more machine details here */}
      </div>
    );
  } catch (error) {
    console.error("Error fetching machine:", error);
    return <div>Error: Unable to fetch machine details</div>;
  }
}
