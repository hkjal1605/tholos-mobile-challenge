import * as SecureStore from "expo-secure-store";

class Storage {
  /**
   * The function sets a value in the SecureStore using a given key.
   * @param key - The key parameter is a string that represents the name or identifier for the value
   * being stored. It is used to retrieve the value later on.
   * @param value - The value parameter is the data that you want to store in the SecureStore. It can
   * be any valid JavaScript value, such as a string, number, boolean, object, or array.
   */
  async set(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  /**
   * The function retrieves the value associated with a given key from SecureStore asynchronously.
   * @param key - The key parameter is a string that represents the key used to retrieve the value from
   * the SecureStore.
   * @returns The value of the item stored in SecureStore with the given key.
   */
  async get(key) {
    return await SecureStore.getItemAsync(key);
  }

  /**
   * The "remove" function uses the SecureStore API to delete an item with the specified key.
   * @param key - The key parameter is a string that represents the identifier or name of the item you
   * want to remove from the SecureStore.
   */
  async remove(key) {
    await SecureStore.deleteItemAsync(key);
  }
}

const storage = new Storage();
export default storage;
