import "expo-router/entry";
import TextEncodingPolyfill from "text-encoding";

Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});
