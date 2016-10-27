library(dplyr)

direct <- read.csv(file="./direct_ownership.csv",head=TRUE,sep=",")
indirect <- read.csv(file="indirect_ownership.csv",head=TRUE,sep=",")

master <- right_join(indirect, direct, by=c("name", "parent"))

ids <- master %>% select(id)

for (i in ids) {
  master %>%
  filter(id=i) %>%
    summarize( count = n() )
}


