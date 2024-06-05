export interface IBlurContext {
    blurArray: string[],
    removeFromArray: (modalName: string) => void;
    addToArray: (modalName: string) => void;
}