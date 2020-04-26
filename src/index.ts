if (!process.env.ALREADY_SET) { require("dotenv").config(); }

import { getConnection } from "typeorm";
import { BlogContent } from "./app/models/entities/BlogContent";
import { BaseService } from "./app/models";
import { blogContentsResponse, newBlogContent } from "./response/blog-content-response-new";
import { performance } from "perf_hooks";

async function init() {
  return await BaseService.getConnection();
}

async function writeBlogContent() {
  const blogContentRepository = getConnection().getRepository(BlogContent);
  for await(let [index, blogContentResponse] of blogContentsResponse.entries()) {
    const blogContent: any = new BlogContent();
    blogContent.title = `${blogContentResponse.title} ${index}`;
    blogContent.data = blogContentResponse.data;
    await blogContentRepository.save(blogContent);
  };
  return blogContentRepository;
}

async function readBlogContent() {
  const blogContentRepository = getConnection().getRepository(BlogContent);
  return await blogContentRepository.find();
}

async function updateBlogContent(newBlogContent: any) {
  const blogContentRepository = getConnection().getRepository(BlogContent);
  return await blogContentRepository.save(newBlogContent);
}

async function clearAll() {
  const blogContentRepository = getConnection().getRepository(BlogContent);
  return await blogContentRepository.clear();
}

async function writeOperation() {
  const startTime: number = performance.now();
  await writeBlogContent();
  const endTime: number = performance.now();
  return +(endTime - startTime).toFixed(2);
}

async function readOperation() {
  const startTime = performance.now();    
  const content: any = await readBlogContent();
  console.log("Total content size >>>", content.length);
  const endTime = performance.now();
  return +(endTime - startTime).toFixed(2);
}

async function updateOperation() {
  const startTime = performance.now();    
  await updateBlogContent(newBlogContent);
  const endTime = performance.now();
  return +(endTime - startTime).toFixed(2);
}

(async() => {
  try {
    await init();
    await clearAll();

    const totalTimeTakenToWriteContent = await writeOperation();
    const totalTimeTakenToReadContent = await readOperation();    
    const totalTimeTakenToUpdateOneContent = await updateOperation();

    // Stats
    const benchmark: any = {
      [process.env.DB_DIALECT]: {
        WRITE: totalTimeTakenToWriteContent,
        READ: totalTimeTakenToReadContent,
        UPDATE: totalTimeTakenToUpdateOneContent
      }
    }
    console.table(benchmark);
    process.exit(0);
  } catch(err) {
    console.log("Error while processing >>>", err);
  }
})();