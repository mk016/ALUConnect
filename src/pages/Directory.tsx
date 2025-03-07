
import Layout from "@/components/layout/Layout";
import AlumniFinder from "@/components/directory/AlumniFinder";
import { motion } from "framer-motion";

export default function Directory() {
  return (
    <Layout>
      <div className="container max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Alumni Directory
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            Connect with alumni from universities around the world. Use the filters below to find alumni by college, field, or name.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <AlumniFinder />
        </motion.div>
      </div>
    </Layout>
  );
}
