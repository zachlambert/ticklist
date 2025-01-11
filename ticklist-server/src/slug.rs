pub fn create_slug(string: &str) -> String {
    return string
        .to_string()
        .to_lowercase()
        .replace(" ", "-");
}
