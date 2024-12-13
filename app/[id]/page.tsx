import { Metadata } from "next";
import connectDB from "@/config/database";
import Machine from "@/models/equipment";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function MachinePage({ params }: Props) {
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // This function is optional but recommended for SEO
  return {
    title: `Machine ${params.id}`,
  };
}
