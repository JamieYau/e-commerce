export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  return (
    <main className="m-10 mx-auto max-w-6xl rounded-md border p-10 text-center">
      <div className="mb-10">
        <h1 className="mb-2 text-4xl font-extrabold">Thank you!</h1>
        <h2 className="text-2xl">You successfully sent</h2>

        <div className="mt-5 p-2 text-4xl font-bold ">
          £{amount}
        </div>
      </div>
    </main>
  );
}
