import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { User } from "next-auth";
import UserModel from "@/model/User";

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: { messageid: string };
  }
) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session.user) {
    return Response.json(
      { success: false, messages: "Not Authenticated " },
      { status: 401 }
    );
  }
  try {
    const updateResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: params.messageid } } }
    );
    if (updateResult.modifiedCount == 0) {
      return Response.json(
        {
          success: false,
          message: "Message not found or deleted already",
        },
        { status: 404 }
      );
    }
    return Response.json(
      { success: true, message: "Message deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to delete message", error);

    return Response.json(
      { success: false, message: "Failed to delete message" },
      { status: 500 }
    );
  }
}
