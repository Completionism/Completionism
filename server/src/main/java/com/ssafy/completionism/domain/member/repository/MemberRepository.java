package com.ssafy.completionism.domain.member.repository;

import com.ssafy.completionism.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    @Query("select m from Member m where m.loginId=:loginId")
    Optional<Member> findByLoginId(@Param("loginId") String loginId);
}
