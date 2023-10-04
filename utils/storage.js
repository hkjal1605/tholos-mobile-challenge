import * as SecureStore from "expo-secure-store";

class Storage {
  async set(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async get(key) {
    return await SecureStore.getItemAsync(key);
  }

  async remove(key) {
    await SecureStore.deleteItemAsync(key);
  }
}

const storage = new Storage();
export default storage;
