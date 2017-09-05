export function getNovoSortDuplicateNovoSortableIdError(id: string): Error {
    return Error(`Cannot have two NovoSortables with the same id (${id}).`);
}

export function getNovoSortHeaderNotContainedWithinNovoSortError(): Error {
    return Error(`NovoSortHeader must be placed within a parent element with the NovoSort directive.`);
}

export function getNovoSortHeaderMissingIdError(): Error {
    return Error(`NovoSortHeader must be provided with a unique id.`);
}
