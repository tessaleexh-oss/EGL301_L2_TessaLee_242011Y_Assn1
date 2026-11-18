// Dataset 1 - Subscriptions
let subscriptions = [
    {
        id: 1,
        customerName: "John Doe",
        plan: "Basic",
        billingCycle: "Monthly",
        status: "Active",
        startDate: "2026-11-01",
        expiryDate: "2026-12-01"
    },
    {
        id: 2,
        customerName: "Jane Doe",
        plan: "Standard",
        billingCycle: "Monthly",
        status: "Active",
        startDate: "2026-11-05",
        expiryDate: "2026-12-05"
    },
    {
        id: 3,
        customerName: "Peter Lim",
        plan: "Premium",
        billingCycle: "Annual",
        status: "Active",
        startDate: "2026-01-01",
        expiryDate: "2027-01-01"
    },
    {
        id: 4,
        customerName: "Mary Tan",
        plan: "Basic",
        billingCycle: "Monthly",
        status: "Expired",
        startDate: "2026-09-01",
        expiryDate: "2026-10-01"
    }
];

// Dateset 2 - Plans
let plans = [
    {
        planId: "Basic",
        monthlyPrice: 9.90,
        annualPrice: 99.00,
        accessLevel: 1,
        maxDevices: 1
    },
    {
        planId: "Standard",
        monthlyPrice: 13.90,
        annualPrice: 139.00,
        accessLevel: 2,
        maxDevices: 2
    },
    {
        planId: "Premium",
        monthlyPrice: 18.90,
        annualPrice: 189.00,
        accessLevel: 3,
        maxDevices: 4
    }
];

// Dataset 3 - Content
let contents = [
    {
        contentId: 101,
        title: "Glee",
        genre: "Comedy",
        requiredAccessLevel: 1
    },
    {
        contentId: 102,
        title: "10 Things I Hate About You",
        genre: "Romance",
        requiredAccessLevel: 1
    },
    {
        contentId: 103,
        title: "Grey's Anatomy",
        genre: "Drama",
        requiredAccessLevel: 2
    },
    {
        contentId: 104,
        title: "How I Met Your Mother",
        genre: "Sitcom",
        requiredAccessLevel: 3
    },
    {
        contentId: 105,
        title: "The Office",
        genre: "Sitcom",
        requiredAccessLevel: 3
    }
];

module.exports = {
    // Function 1: Create a new subscription / Check for an existing or invalid subscription
    subscribeUser(customerName, plan, billingCycle) {
        try {
            // Check if customer already has a subscription
            let existingSubscription = subscriptions.find(
                sub => sub.customerName === customerName && sub.status === "Active"
            );

            if (existingSubscription) {
                return "Customer already has an active subscription";
            }

            // Check if plan is valid
            if (plan !== "Basic" && plan !== "Standard" && plan !== "Premium") {
                return "Invalid subscription plan";
            }

            // Check if billing cycle is valid
            if (billingCycle !== "Monthly" && billingCycle !== "Annual") {
                return "Invalid billing cycle";
            }

            // Set subscription dates
            let startDate = new Date();
            let expiryDate = new Date();

            if (billingCycle === "Monthly") {
                expiryDate.setMonth(expiryDate.getMonth() + 1);
            } else {
                expiryDate.setFullYear(expiryDate.getFullYear() + 1);
            }

            // Create new subscription
            const newSubscription = {
                id: subscriptions.length + 1,
                customerName: customerName,
                plan: plan,
                billingCycle: billingCycle,
                status: "Active",
                startDate: startDate.toISOString().split("T")[0],
                expiryDate: expiryDate.toISOString().split("T")[0]
            };

            subscriptions.push(newSubscription);

            return `New subscription for ${customerName} has been created`;

        } catch (error) {
            console.log(error.message);
            throw new Error("Failed to create new subscription");
        }
    },

    // Function 2: Change subscription plan
    changePlan(id, newPlan) {
        try {
            // Find subscription using ID
            let subscription = subscriptions.find(
                sub => sub.id === Number(id)
            );

            if (!subscription) {
                return "Subscription not found";
            }

            // Check if subscription is active
            if (subscription.status !== "Active") {
                return "Subscription is not active";
            }

            // Check if new plan is valid
            if (newPlan !== "Basic" && newPlan !== "Standard" && newPlan !== "Premium") {
                return "Invalid subscription plan";
            }

            // Check if customer is already on the same plan
            if (subscription.plan === newPlan) {
                return "Customer is already subscribed to this plan";
            }

            // Update subscription plan
            subscription.plan = newPlan;
            return `Subscription No.${id} has been updated to ${newPlan}`;

        } catch (error) {
            console.log(error.message);
            throw new Error("Failed to change subscription plan");
        }
    },

    // Function 3: Check if customer can access content
    checkContentAccess(id, contentId) {
        try {
            // Find subscription using ID
            let subscription = subscriptions.find(
                sub => sub.id === Number(id)
            );
            if (!subscription) {
                return "Subscription not found";
            }

            // Check if subscription is active
            if (subscription.status !== "Active") {
                return "Subscription is not active";
            }

            // Check if subscription has expired
            if (new Date(subscription.expiryDate) <= new Date()) {
                return "Subscription has expired";
            }

            // Find content using content ID
            let content = contents.find(
                c => c.contentId === Number(contentId)
            );

            if (!content) {
                return "Content not found";
            }

            // Find customer's subscription plan
            let plan = plans.find(
                p => p.planId === subscription.plan
            );

            if (!plan) {
                return "Invalid subscription plan";
            }

            // Check if customer has access
            if (plan.accessLevel >= content.requiredAccessLevel) {
                return `Access granted! You can watch ${content.title}`;
            } else {
                return `Access denied! Your plan does not allow you to watch ${content.title}`;
            }

        } catch (error) {
            console.log(error.message);
            throw new Error("Failed to check content access");
        }
    },

    // Function 4: Calculate subscription bill
    calculateBill(plan, billingCycle, discountPercent) {
        try {
            // Find subscription plan
            let selectedPlan = plans.find(
                p => p.planId === plan
            );
            
            if (!selectedPlan) {
                return "Invalid subscription plan";
            }

            // Check if billing cycle is valid
            if (billingCycle !== "Monthly" && billingCycle !== "Annual") {
                return "Invalid billing cycle";
            }

            // Check if discount is valid
            if (discountPercent < 0 || discountPercent > 100) {
                return "Invalid discount percentage";
            }

            // Get subscription price
            let price;

            if (billingCycle === "Monthly") {
                price = selectedPlan.monthlyPrice;
            } else {
                price = selectedPlan.annualPrice;
            }

            // Calculate discount
            let discount = price * (discountPercent / 100);

            // Calculate final price
            let finalPrice = price - discount;

            return `Original Price: $${price.toFixed(2)}, Discount: $${discount.toFixed(2)}, Final Price: $${finalPrice.toFixed(2)}`;

        } catch (error) {
            console.log(error.message);
            throw new Error("Failed to calculate subscription bill");
        }
    },

    // Function 5: Renew an existing subscription
    renewSubscription(id) {
        try {
            // Find subscription using ID
            let subscription = subscriptions.find(
                sub => sub.id === Number(id)
            );
            if (!subscription) {
                return "Subscription not found";
            }

            // Find customer's subscription plan
            let plan = plans.find(
                p => p.planId === subscription.plan
            );
            if (!plan) {
                return "Invalid subscription plan";
            }

            // Check billing cycle
            if (subscription.billingCycle !== "Monthly" && subscription.billingCycle !== "Annual") {
                return "Invalid billing cycle";
            }

            // Get current date and expiry date
            let today = new Date();
            let expiryDate = new Date(subscription.expiryDate);

            // If subscription has expired, renew from today
            if (expiryDate < today) {
                expiryDate = new Date(today);
            }

            // Extend subscription based on billing cycle
            if (subscription.billingCycle === "Monthly") {
                expiryDate.setMonth(expiryDate.getMonth() + 1);
            } else {
                expiryDate.setFullYear(expiryDate.getFullYear() + 1);
            }

            // Update subscription
            subscription.expiryDate = expiryDate.toISOString().split("T")[0];
            subscription.status = "Active";

            // Get renewal price
            let price;

            if (subscription.billingCycle === "Monthly") {
                price = plan.monthlyPrice;
            } else {
                price = plan.annualPrice;
            }

            return `Subscription No.${id} has been renewed successfully! New expiry date: ${subscription.expiryDate}. Renewal price: $${price.toFixed(2)}`;

        } catch (error) {
            console.log(error.message);
            throw new Error("Failed to renew subscription");
        }
    }
}
