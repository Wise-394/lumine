import styles from "@styles/components/NewPostForm.module.css";

export function NewPostForm() {
  return (
    <div className={styles.formContainer}>
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
