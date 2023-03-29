package site.carborn.repository.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.RepairBook;
import site.carborn.mapping.user.UserRepairBookDetailMapping;
import site.carborn.mapping.user.UserRepairBookListMapping;
import site.carborn.mapping.user.RepairBookGetDetailMapping;
import site.carborn.mapping.user.RepairBookGetListMapping;

@Repository
public interface RepairBookRepository extends JpaRepository<RepairBook, Integer> {
    //예약 목록 조회
    Page<UserRepairBookListMapping> findByStatusAndAccount_Id(Boolean status, String accountId, Pageable page);

    //예약 단일 조회
    UserRepairBookDetailMapping findByStatusAndId(Boolean status, Integer id);

    Page<RepairBookGetListMapping> findByStatusAndRepairShop_Id(boolean status, int repairShopId, Pageable page);

    RepairBookGetDetailMapping findAllById(int id);
}
