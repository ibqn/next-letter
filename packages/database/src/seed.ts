import { db } from "./drizzle/db"
import { subscriptionTable } from "./drizzle/schema/subscription"

async function seed() {
  const subscriptionItems = [{ email: "evgen.ibqn@gmail.com" }, { email: "lev@gmail.com" }]

  console.log("⏳ Seeding...")
  const start = Date.now()

  const insertedSubscriptions = await db
    .insert(subscriptionTable)
    .values(subscriptionItems)
    .onConflictDoNothing()
    .returning()

  console.log(`${insertedSubscriptions.length} subscription item(s) inserted.`)

  const end = Date.now()
  console.log(`Completed in ${end - start}ms.`)
}

seed()
  .then(() => {
    console.log("✅ Seeding successful")
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ Seeding failed")
    console.error(error)
    process.exit(1)
  })
