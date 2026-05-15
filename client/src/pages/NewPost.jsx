import styles from "@styles/components/NewPost.module.css";
export function NewPost() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.header}>
        <h1> New Post</h1>
        <button type="submit">Post</button>
      </div>
      <div className={styles.body}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" placeholder="Hello world" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea placeholder="enter post description"></textarea>
        </div>
        <div>
          <label htmlFor="description">Code</label>
          <textarea placeholder="print('Hello World')"></textarea>
        </div>
      </div>
    </form>
  );
}
