import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, verifyCode } = await request.json();

    const decodedUsername = decodeURIComponent(username);

    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 500,
        }
      );
    }
    const isCodeValid = user.verifyCode == verifyCode.toString();
    const ifVerifyCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && ifVerifyCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "User verified successfully",
        },
        {
          status: 200,
        }
      );
    } else if (!ifVerifyCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message:
            "Verification code is expires please signup agin to get a new code",
        },
        {
          status: 400,
        }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Invalid verification code",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.log("Error Verifying user");
    return Response.json(
      {
        success: false,
        message: "Error Verifying user",
      },
      {
        status: 500,
      }
    );
  }
}
