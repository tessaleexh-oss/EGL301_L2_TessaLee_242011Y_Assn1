# Disney+ Subscription Manager
The Disney+ Content Subscription Manager is a Node.js module designed to simulate the management of customer subscriptions for a streaming platform. It contains five functions that allow users to create new subscriptions, change existing subscription plans, check access to movies and TV shows, calculate subscription fees, and renew subscriptions.

# ============== Functions ==============
# Function 1 - Create a new subscription
When Function 1 is called, a new subscription will be created. The function will first check if the customer already has an existing subscription, if the subscription plan is vallid, and if the billing cycle is valid. If any of these parameters are invalid, a message will be returned to alert them which field was invalid. 

Upon successful creation, a success message will be returned.

Parameters needed:
> customerName, plan, billingCycle

How to call:
> console.log(manager.subscribeUser("Alex Tan", "Basic", "Monthly"));

Expected Successful Outcome:
> New subscription for Alex Tan has been created

# Function 2 - Change subscription plan
When Function 2 is called, an existing customer's subscription plan will be changed. The function will first search for the subscription using its ID and check if the subscription exists and is active. The function will then validate the new subscription plan and check if the customer is already subscribed to the selected plan. If any of these checks fail, an appropriate message will be returned. Upon successful validation, the customer's subscription plan will be updated, and a success message will be returned.

Parameters needed:
> id, newPlan

How to call:
> console.log(manager.changePlan(1, "Premium"));

Expected Successful Outcome:
> Subscription No.1 has been updated to Premium

# Function 3 - Check content access
When Function 3 is called, the function will check whether a customer is allowed to watch a particular movie or TV show based on their subscription plan. The function will first search for the customer's subscription using its ID and check whether the subscription is active and has not expired. It will then search for the requested content using its content ID and retrieve the customer's subscription plan. It will compare the customer's subscription access level with the required access level of the selected content. 

If the customer's access level is equal to or higher than the required level, access will be granted. Otherwise, access will be denied. A message will be returned to inform the customer whether they are allowed to watch the selected content.

Parameters needed:
> id, contentId

How to call: 
> console.log(manager.checkContentAccess(1, 105));

Expected successful outcome:
> Access granted! You can watch The Office

# Function 4 - Calculate Bill
When Function 4 is called, the total subscription fee will be calculated based on the selected subscription plan, billing cycle, and discount percentage. The function will first check whether the subscription plan and billing cycle are valid. It will also validate the discount percentage to ensure that it is between 0% and 100%. If any of these checks fail, an appropriate message will be returned.

Upon successful validation, the function will retrieve the subscription price based on the selected billing cycle. It will then calculate the discount amount and subtract it from the original price to determine the final subscription fee. A success message will display the original price, discount amount, as well as final price.

Parameters needed:
> plan, billingCycle, discountPercent

How to call:
> console.log(manager.calculateBill("Premium", "Monthly", 10));

Expected successful outcome:
> Original Price: $18.90, Discount: $1.89, FinalPrice: $17.01

# Function 5 - Renew Subscription
When Function 5 is called, an existing customer's subscription will be renewed. The function will first search for the subscription using its ID and check whether the plan and billing cycle are valid. It will then check the subscription's expiry date. If the subscription has expired, the new billing period will begin from the current date. Otherwise, the existing expiry date will be used. The expiry date will also be extended depending on the customer's current billing cycle. 

Upon successful renewal, a success message containg the new expiry date and renewal price will then be returned.

Parameters needed:
> id

How to call:
> console.log(manager.renewSubscription(1));

Expected successful outcome:
> Subscription No.1 has been renewed successfully! New expiry date: 2027-01-01. Renewal price: $18.90

# References
Website reference: (https://www.disneyplus.com/)
Usage of ChatGPT was involved in generating mock data for the node module.
