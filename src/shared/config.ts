import "dotenv/config"


interface Config {
    port: number;
    companyID: string;
    token: string
    chatId: number

    // db: {
    //   host: string;
    //   port: number;
    //   username: string;
    //   password: string;
    //   name: string;
    // };
    // jwt: {
    //   secret: string;
    // };
  }
  
const config: Config = {
    port: parseInt(process.env.PORT!),
    companyID: process.env.COMPANY_ID,
    token: process.env.TOKEN,
    chatId: parseInt(process.env.CHAT_ID!),
    // db: {
    //   host: process.env.DB_HOST!,
    //   port: parseInt(process.env.DB_PORT!),
    //   username: process.env.DB_USER!,
    //   password: process.env.DB_PASSWORD!,
    //   name: process.env.DB_NAME!,
    // },
    // jwt: {
    //   secret: process.env.JWT_SECRET!,
    // },
  };
  
  export default config;
  