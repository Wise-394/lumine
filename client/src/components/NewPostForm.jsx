import styles from "@styles/components/NewPostForm.module.css";
import { useNewPostStore } from "../store/newPostStore.jsx";

export function NewPostForm() {
  const { title, description, updateField } = useNewPostStore();
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
            value={title}
            required
            minLength={6}
            maxLength={256}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </div>

        <div className={styles.divDescription}>
          <label htmlFor="description">
            Description <span className={styles.optional}>- optional</span>
          </label>
          <textarea
            id="description"
            placeholder="Enter post description"
            value={description}
            onChange={(e) => updateField("description", e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
