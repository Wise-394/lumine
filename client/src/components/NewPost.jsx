import styles from "@styles/components/NewPost.module.css";

export function NewPost() {
  return (
    <div className={styles.newPostcontainer}>
      <div className={styles.postBody}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Hello world"
          />
        </div>
        <div>
          <label htmlFor="description">Language</label>
          <input type="text" id="language" placeholder="javascript" />
        </div>

        <div className={styles.divDescription}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter post description"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
