import { getOrders } from "@/actions/orderActions";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/auth";
import { format } from "date-fns";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function OrdersPage() {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  const user = session.user;
  if (user.id === undefined) {
    throw new Error("No user Id");
  }
  const orders = await getOrders(user.id);
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-2 sm:px-8">
      <section>
        <h1 className="text-2xl font-bold mb-4">Order History</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  {format(new Date(order.createdAt), "dd MMM yy")}
                </TableCell>
                <TableCell>£{order.totalAmount}</TableCell>
                <TableCell>{order.orderItems.length}</TableCell>
                <TableCell>
                  <Badge variant={"default"}>{order.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/orders/${order.id}`}
                    className={buttonVariants({ variant: "default" })}
                  >
                    View Order
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
