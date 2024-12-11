"use client"
import { Button } from "../ui/button";


const Checkout = ({
    plan,
    amount,
    credits,
    buyerId,
}: {
    plan: string;
    amount: number;
    credits: number;
    buyerId: string;
}) => {


    const handleCheckout = async () => {
        try {
            const transaction = { plan, amount, credits, buyerId };

            const response = await fetch("/api/stripe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(transaction),
            });

            if (!response.ok) throw new Error("Failed to create checkout session");

            const { url } = await response.json();
            window.location.href = url; // Redirect to Stripe Checkout
        } catch (error) {
            console.log(error);

        }
    };


    return (
        <Button onClick={handleCheckout} className="w-full rounded-full bg-purple-gradient bg-cover">
            Buy Credit
        </Button>
    );
};

export default Checkout;
