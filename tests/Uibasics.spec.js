const { test, expect } = require('@playwright/test');
const { TIMEOUT } = require('node:dns');

test.only('uibasis',async ({ page }) => 
    
    {
           const slowexpect=  expect.configure({timeout:9000});
      await  page.goto("https://rahulshettyacademy.com/angularpractice/");
      await  page.getByLabel("Check me out if you Love IceCreams!").check();

      await page.getByLabel("Gender").selectOption("Male");
      await page.getByLabel("Employed").click();
      await page.getByPlaceholder("Password").fill("password");
      await page.getByRole("button", {name: 'Submit'}).click()
      await page.getByText(" The Form has been submitted successfully!.").isVisible();
     await  expect(  page.getByText(" The Form has been submitted successfully!.")).isVisible({timeout:12000});
     await  slowexpect(  page.getByText(" The Form has been submitted successfully!.")).isVisible();
      await page.getByRole("link",{name:'Shop'}).click();
      await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

      

   }
         
);



const title=`Test Event ${Date.now()}`;
let seatcountbefore=0;
test('Full booking flow with Event Creation', async({page})=>
{   
//Step 1 — login
    await page.goto("https://eventhub.rahulshettyacademy.com");
    await page.getByPlaceholder("you@email.com").fill("goli007@gmail.com")
    await page.getByLabel("Password").fill("Kaira@123");
    await page.getByRole("button", {name:"Sign In"}).click();
    expect(page.locator("[href='/events'] span")).toContainText("Browse Events");
//Step 2 — Create a new event
    await page.getByRole("button",{name: "Admin"}).click();
    await page.locator("div.top-full [href='/admin/events']").click();
    await page.getByLabel("Title").fill(title);
    await page.getByPlaceholder("Describe the event…").fill("Testing purpose");
    await page.locator("#category").selectOption("Workshop");
    await page.getByLabel("City").fill("Kolkata");
    await page.getByLabel("Venue").fill("SaltLake");
    await page.getByLabel("Event Date & Time").fill("2026-11-14T12:08");
    await page.getByLabel("Price ($)").fill("300");
    await page.getByLabel("Total Seats").fill("50");
    await page.getByRole("button", {name:"Add Event"}).click();
//Step 3 — Find the event card and capture seats
    await page.locator("#nav-events").click();
    await expect(page.getByTestId("event-card").first()).toBeVisible();
    const eventcard= page.locator("#event-card div.p-4");
    expect(eventcard.filter({hasText:title}).isVisible()).toBeTruthy();
    seatcountbefore = parseInt((await eventcard.filter({hasText:title}).locator("span.text-xs").textContent()).split(" ")[0]);
    console.log("Seat Before:", seatcountbefore);
//Step 4 — Start booking
    await eventcard.filter({hasText:title}).getByTestId("book-now-btn").click();
 //Step 5 — Fill booking form
    await expect(page.locator("#ticket-count")).toHaveCount(1);
    await page.getByLabel("Full Name").fill("Govind Tiwari");
    await page.locator("#customer-email").fill("govin007@gmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("4356987658");
    await page.locator("button.inline-flex").click();
//Step 6 — Verify booking confirmation
    const booking = page.locator(".booking-ref");
    await expect(booking).toBeVisible();
    const bookingref= await booking.textContent();
    console.log(bookingref.trim());
//Step 7 — Verify in My Bookings
    await page.getByRole("button", {name:"View My Bookings"}).click();
    console.log(page.url());
    expect(await page.url()).toContain("/bookings");
    expect(page.locator("#booking-card").first()).toBeVisible();
    const BookingRef= page.locator("#booking-card").filter({hasText:title}).locator("span.booking-ref");
    expect(BookingRef).toHaveText(bookingref);
    //console.log(await page.locator("h3.font-semibold").filter({hasText:title}).textContent());
    await expect(page.locator("h3.font-semibold").filter({hasText:title})).toHaveText(title);
    await page.locator("#logout-btn").click();   
}
)

//Step 8 — Verify seat reduction
test.afterEach("test testcase", async({page})=>
{
 await page.goto("https://eventhub.rahulshettyacademy.com");
    await page.getByPlaceholder("you@email.com").fill("goli007@gmail.com")
    await page.getByLabel("Password").fill("Kaira@123");
    await page.getByRole("button", {name:"Sign In"}).click();
    await page.getByTestId("nav-events").click()
    await expect(page.getByTestId("event-card").first()).toBeVisible();
    const eventcard1= page.locator("#event-card div.p-4");
    expect(eventcard1.filter({hasText:title}).isVisible()).toBeTruthy();
    const seatcountafter = parseInt((await eventcard1.filter({hasText:title}).locator("span.text-xs").textContent()).split(" ")[0]);
    console.log("Seat after:",seatcountafter);
    expect(seatcountafter).toBe(seatcountbefore - 1);
}
)