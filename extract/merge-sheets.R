require(XLConnect)

wb <- loadWorkbook("~/workspace/mittelbar.xlsx", create = F)

ls <- 8:9

init <- readWorksheet(wb, 7, 14, 1, header = FALSE)

extractBulk <- function (l) {
  
  readWorksheet (wb, l, 7, 1, header = FALSE)
}

x <- lapply(ls, extractBulk)
res <- Reduce(rbind, x, init)


