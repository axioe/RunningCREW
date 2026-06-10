import MyPost from "./MyPost";

function TabContent({ tabState, post, addPost }) {
  return [<Post post={post} addPost={addPost} />][tabState];
}

export default TabContent;
