We are group C, the group members being comprised of @mdcurt, @BlueCollarGiant, and @NimCloud90, and for our Angular group project, we made an ice cream shop.

Things of note to keep in mind: for our project we used firebase for our backend so data like our ice cream flavors and our prices are all on there, of which you will likely not have access to. We are also using the nes.css framework for said css.

Now here's a summary of the site:

It's an ice cream shop with a video game like twist to it, from the design to the rewards program we wanted to make a fun and enjoyable experience that combines the deliciousness of ice cream and the fun and whimsy of video games.

There are four pages to our website that being: the Home page, the Checkout page, the Menu page, and the Account page.

The Home page is the landing page for when you first open the site, and that's it main function.

The Account page is where you can make an account on the site or if you've already made an account it'll let you sign on into said account. That data is stored locally however and isn't part of the backend. It has both a Favorites and an Address section but those aren't in use currently. The VIP membership section showcases the XP system and rewards beside on your rank, it also shows you the different ways you are able to gain XP. There's also a button that'll take you to the menu to start shopping.

The Menu and Checkout go hand and hand. In the Menu you're able to browse around, add items to a cart and allows you to add as much or as little to the cart. The ice cream flavors are comprised of cards are dynamically generated from data pulled from our backend. On the cards is the name of the ice cream and if you click on the card, it'll extend so you can see a description of the flavor, the price, and the rarity of the ice cream (which is a way to gain XP points).

The Checkout pulls the card data (the ice cream, the price, how much your buying, ect) and drags it to the checkout where it'll calculate the overall total of what the customer is buying. Also we placed some seasonal ice cream at checkout as well.

And that's about it.