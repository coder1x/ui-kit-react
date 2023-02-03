import 'focus-visible/dist/focus-visible.min.js';
import '@styles/styles';

type RequireContext = {
  keys(): string[];
  (id: string): any;
  <T>(id: string): T;
  resolve(id: string): string;
  id: string;
};

function requireAll(requireContext: RequireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(
  require.context(
    './components/',
    true,
    /^\.\/(?!.*((?:__tests__)|(?:\.d))).*\.((scss)|(jsx?)|(tsx?))$/
  )
);
requireAll(
  require.context('./pages/', true, /^\.\/(?!.*((?:__tests__)|(?:\.d))).*\.((scss)|(jsx?)|(tsx?))$/)
);
