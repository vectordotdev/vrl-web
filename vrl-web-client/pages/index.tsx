import { Link } from "@chakra-ui/layout";
import { NextPage } from "next";

const Index: NextPage = () => {
  return <>
    <h1>
      Welcome home!
    </h1>

    <p>
      Learn more about <Link href="/vrl">VRL</Link>.
    </p>
  </>
}

export default Index;