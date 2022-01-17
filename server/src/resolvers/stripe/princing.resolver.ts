import { Resolver, Query, ObjectType, Field } from "type-graphql";
import { stripe } from "../../utils/stripe";
import Stripe from "stripe";

@ObjectType()
class PricingResponse {
  priceID: string;
  currency: string;
}

@Resolver()
export class PricingResolver {
  @Query(() => String)
  async pricing(): Promise<string> {
    const prices = await stripe.prices.list({
      expand: ["data.product"],
    });

    // map pricing and products
    let data = prices.data.filter((price) => price.active);
    const d = data.map((price) => {
      const prod = price.product as Stripe.Product;
      return {
        price_id: price.id,
        amount: price.unit_amount,
        currency: price.currency,
        product_id: prod.id,
        product_name: prod.name,
      };
    });
    console.log("final data => ", d);
    //console.log("price product => ", prices.data[0].product);
    //
    return "ok";
  }
}
