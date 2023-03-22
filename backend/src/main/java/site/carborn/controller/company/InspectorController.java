package site.carborn.controller.company;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.carborn.entity.user.InspectBook;
import site.carborn.entity.user.InspectResult;
import site.carborn.service.company.InspectorService;
import site.carborn.util.network.NormalResponse;

import java.time.LocalDateTime;
import java.util.Optional;

@Tag(name = "Inspector", description = "검수원 검수 관련 API")
@RequestMapping("/api/inspector")
@RequiredArgsConstructor
@RestController
public class InspectorController {
    @Autowired
    private InspectorService inspectorService;

    @GetMapping("/book/list/{page}/{size}")
    @Operation(description = "검수원 검수 예약 전체 목록")
    @Parameters({
            @Parameter(name = "page", description = "페이지 번호"),
            @Parameter(name = "size", description = "페이지 사이즈")
    })
    public ResponseEntity<?> inspectBookList(@PathVariable("page") int page, @PathVariable("size") int size){
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").descending());
        return NormalResponse.toResponseEntity(HttpStatus.OK, inspectorService.inspectBookGetList(pageRequest));
    }

    @GetMapping("book/{id}")
    @Operation(description = "검수원 검수 예약 상세 조회")
    @Parameter(name = "id", description = "게시물 번호")
    public ResponseEntity<?> inspectBookDetailContent(@PathVariable("id") int id){
        return NormalResponse.toResponseEntity(HttpStatus.OK,inspectorService.inspectBookDetail(id));
    }

    @PutMapping("book/{id}")
    @Operation(description = "검수원 검수 예약 상태 수정 및 검수 데이터 입력")
    @Parameter(name = "id", description = "예약 번호")
    public ResponseEntity<?> inspectBookUpdate(@PathVariable("id") int id, @RequestBody InspectResult inspectResult){
        Optional<InspectBook> updateData = inspectorService.inspectBookDetail(id);

        if(!updateData.isPresent()){
            return NormalResponse.toResponseEntity(HttpStatus.BAD_REQUEST,"예약 번호가 잘못되었습니다.");
        }
        //예약 상태 수정
        updateData.get().setBookStatus(2);
        inspectorService.inspectorBookUpdate(updateData.get());

        //검수 결과 입력
        inspectResult.setInspectBook(new InspectBook());
        inspectResult.getInspectBook().setId(id);
        inspectResult.setRegDt(LocalDateTime.now());
        inspectorService.inspectorResultInsert(inspectResult);
        //multipartfile 입력 부분

        //caver 입력 부분

        return NormalResponse.toResponseEntity(HttpStatus.OK,"예약 상태 수정 및 데이터 입력 완료");
    }
}
