FROM rust:1.74
COPY ./ ./
RUN cargo build --release
EXPOSE 9000
CMD ["./target/release/ticklist-server"]
