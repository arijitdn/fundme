import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json(); // Get amount from request body

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return Response.json(order, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    } else {
      return Response.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
