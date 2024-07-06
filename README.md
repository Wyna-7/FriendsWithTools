## EquipMate

![EquipMate](https://github.com/FriendsWithTools/FriendsWithTools/assets/29009407/d1eedc00-139a-4c28-87d9-af741d3e9b50)


EquipMate is a tool renting app that allows users to upload the tools they own, offer them for rent, view other user's tools, and rent them.

## Screenshots

<img width="768"  alt="products-one" src="https://github.com/FriendsWithTools/FriendsWithTools/assets/29009407/2160facc-11fd-46b2-b541-93cb37012752">
<img width="768" alt="product-two" src="https://github.com/FriendsWithTools/FriendsWithTools/assets/29009407/dd5268ad-dd67-48a7-ba6b-a8b480c50074">

## Getting started
To run EquipMate you will need to connect to two external services and store their information in your ENV file: 

### Clerk 
- Create a free account on [Clerk](https://clerk.com) and follow this [documentation](https://clerk.com/docs/quickstarts/nextjs). 
- Set up a webhook to store Clerk data in your local database following this [documentation](https://clerk.com/docs/integrations/webhooks/sync-data).
  
### Firebase 
- To get the API keys you will need, follow this [documentation](https://firebase.google.com/docs/storage/web/start).
- Save your Firebase information in the project ENV file
```
DATABASE_URL=" "

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/explore
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/explore

WEBHOOK_SECRET=
```

### Database seeding
If you would like to seed the database before starting, use the following commands:

```
npx  prisma generate
```
```
npx prisma migrate dev
```
You should see the following message on your terminal 
```
🌱  The seed command has been executed.
```
If you would like to work with Prisma Studio, use this command:
```
npx prisma studio --browser chrome
```

To launch EquipMate, run
```
npm run dev
```


## Tech Stack
* [NextJS](https://nextjs.org)
* [TypeScript](https://www.typescriptlang.org)
* [Tailwind](https://tailwindcss.com)
* [Shadcn](https://ui.shadcn.com/)
* [Prisma](https://www.prisma.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [Socket.io](https://socket.io/)
* [Firebase](https://firebase.google.com/)
* [Clerk](https://clerk.com)
* [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
* [Jest](https://jestjs.io/)
* [Cypress](https://www.cypress.io)

## Developers
* Queralt Guillen Lafuente [Github](https://github.com/Wyna-7) - [LinkedIn](https://www.linkedin.com/in/queralt-guillen/)
* Sevim Tas Joseph [GitHub](https://github.com/sevtechcodes) - [LinkedIn](https://www.linkedin.com/in/sevimjoseph)
* Jemima Cecil [GitHub](https://github.com/jemimacecil) - [LinkedIn](https://www.linkedin.com/in/jemima-cecil-5602211a0/)
* Brice Fromm [GitHub](https://github.com/Elsass1) - [LinkedIn](https://www.linkedin.com/in/frommbrice)

## Future Features
* User should be able to make and receive payments for accepted rent requests with Stripe
* Users should be able to review each other after returning the rented item. The reviews should be published only when both users have written them.
* Users should be able to see tools for rent as pins on a map near them [Leaflet](https://leafletjs.com/).




