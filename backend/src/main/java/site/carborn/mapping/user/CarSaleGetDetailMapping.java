package site.carborn.mapping.user;

import java.time.LocalDateTime;

public interface CarSaleGetDetailMapping {
    int getId();

    String getAccountId();

    int getCarId();

    String getCarMaker();

    String getCarModelNm();

    String getCarModelYear();

    String getCarRegNm();

    int getCarMileage();

    String getContent();

    int getPrice();

    int getSaleStatus();

    LocalDateTime getRegDt();

    LocalDateTime getUptDt();
}
