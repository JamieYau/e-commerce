import { getOrder } from "@/actions/orderActions";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default async function OrderPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await getOrder(params.id);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col p-2 sm:px-8">
      <Breadcrumb className="mb-4">
        <BreadcrumbList className="gap-1">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/orders">Orders</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{order.id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section>
        <h1 className="mb-4 text-2xl font-bold">Order: {order.id}</h1>
        <p className="mb-4">Order Date: {format(new Date(order.createdAt), "dd MMM yyyy")}</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Product</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.orderItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      src={item.product.imageUrl || "/images/placeholder.png"}
                      alt={item.product.name}
                      fill
                      priority
                      sizes="(min-width: 480px) 86px, (min-width: 440px) calc(100vw - 383px), 51px"
                      className="rounded-md border object-cover"
                    ></Image>
                  </AspectRatio>
                </TableCell>
                <TableCell className="font-medium">
                  {item.product.name}
                </TableCell>
                <TableCell>£{item.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell className="text-right">
                  £{parseFloat(item.price) * item.quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">£{order.totalAmount}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <div className="mt-4 flex justify-end">
          <div className="max-w-80 rounded-md border p-4 w-1/2">
            <p className="mb-4 font-semibold">Delivery</p>
            <p className="mb-1 text-muted-foreground">Address</p>
            {Object.entries(order.shippingAddress).map(([key, value]) => (
              <p key={key} className="leading-5">{value}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
